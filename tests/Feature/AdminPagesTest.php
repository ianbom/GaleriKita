<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPagesTest extends TestCase
{
    use RefreshDatabase;

    private function pages(): array
    {
        $pages = ['dashboard' => 'dashboard'];
        foreach (['tasks', 'users', 'apps', 'chats', 'help-center', 'settings/profile', 'settings/account', 'settings/appearance', 'settings/notifications', 'settings/display', 'demo/auth/sign-in', 'demo/auth/sign-in-2', 'demo/auth/sign-up', 'demo/auth/forgot-password', 'demo/auth/otp', 'demo/errors/401', 'demo/errors/403', 'demo/errors/404', 'demo/errors/500', 'demo/errors/503'] as $page) {
            $pages['admin/'.$page] = 'admin/'.$page;
        }

        return $pages;
    }

    public function test_admin_pages_require_authentication(): void
    {
        foreach ($this->pages() as $path => $component) {
            $this->get('/'.$path)->assertRedirect(route('login'));
        }
    }

    public function test_admin_pages_require_verified_email(): void
    {
        $this->actingAs(User::factory()->unverified()->create());

        foreach ($this->pages() as $path => $component) {
            $this->get('/'.$path)->assertRedirect(route('verification.notice'));
        }
    }

    public function test_verified_users_can_open_every_admin_page(): void
    {
        $this->actingAs(User::factory()->create());

        foreach ($this->pages() as $path => $component) {
            $this->get('/'.$path)->assertOk()->assertInertia(fn (Assert $page) => $page->component($component));
        }
    }

    public function test_unknown_admin_pages_are_not_caught_by_a_wildcard(): void
    {
        $this->actingAs(User::factory()->create())->get('/admin/unknown-page')->assertNotFound();
    }
}
