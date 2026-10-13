<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class GaleriKitaLandingTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_receives_landing_page_without_an_authenticated_user(): void
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('welcome')
                ->where('auth.user', null));
    }

    public function test_authenticated_user_receives_the_same_landing_page_with_auth_context(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('welcome')
                ->where('auth.user.id', $user->id));
    }
}
