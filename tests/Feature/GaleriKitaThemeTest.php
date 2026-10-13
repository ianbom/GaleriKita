<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GaleriKitaThemeTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_uses_native_tailwind_utilities(): void
    {
        $files = array_merge([resource_path('js/pages/welcome.tsx')], glob(resource_path('js/components/galerikita/*.tsx')));
        foreach ($files as $file) {
            $source = file_get_contents($file);
            $this->assertDoesNotMatchRegularExpression('/\[(?!image:)[a-z-]+:[^\]]+\]/', $source, $file);
            $this->assertDoesNotMatchRegularExpression('/gk-(?:compact|small|mobile|mobile-wide):/', $source, $file);
            $this->assertStringNotContainsString('[&', $source, $file);
            $this->assertStringNotContainsString('style=', $source, $file);
            $this->assertStringNotContainsString('gk-', $source, $file);
            $this->assertStringNotContainsString('[@media(width<550px)]', $source, $file);
        }
    }

    public function test_landing_uses_readable_spacing_utilities(): void
    {
        $source = file_get_contents(resource_path('js/components/galerikita/community.tsx'));
        $this->assertStringContainsString('min-h-145', $source);
        $this->assertStringContainsString('scroll-mt-6', $source);
        $this->assertStringContainsString('pt-7', $source);
        $this->assertStringContainsString('pb-3', $source);
        $this->assertStringNotContainsString('min-h-[580px]', $source);
    }

    public function test_global_theme_has_no_alternative_modes(): void
    {
        $source = file_get_contents(resource_path('css/app.css'));
        $this->assertSame(1, substr_count($source, '@theme'));
        $this->assertStringNotContainsString('@custom-variant', $source);
        $this->assertStringNotContainsString('--color-gk-', $source);
        $this->assertStringNotContainsString('.dark', $source);
        $this->assertStringContainsString('--background: #09090b', $source);
        $this->assertStringContainsString('--primary: #ddf76a', $source);
        $this->assertStringNotContainsString('<style>', file_get_contents(resource_path('views/app.blade.php')));
        $this->get(route('home'))->assertOk()->assertDontSee('prefers-color-scheme');
    }

    public function test_verified_users_are_redirected_from_old_appearance_url(): void
    {
        $this->actingAs(User::factory()->create())->get(route('appearance.edit'))->assertRedirect(route('profile.edit'));
    }

    public function test_old_appearance_url_remains_protected(): void
    {
        $this->get(route('appearance.edit'))->assertRedirect(route('login'));
        $this->actingAs(User::factory()->unverified()->create())->get(route('appearance.edit'))->assertRedirect(route('verification.notice'));
    }
}
