<?php

use App\Http\Middleware\EnsureAdminEmailIsVerified;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// Route::middleware(['auth', 'verified', EnsureAdminEmailIsVerified::class])->group(function () {
Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        foreach (['tasks', 'users', 'apps', 'chats', 'help-center'] as $page) {
            Route::inertia($page, 'admin/'.$page)->name($page);
        }
        Route::get('settings', fn () => to_route('admin.settings.profile'))->name('settings');
        foreach (['profile', 'account', 'appearance', 'notifications', 'display'] as $page) {
            Route::inertia('settings/'.$page, 'admin/settings/'.$page)->name('settings.'.$page);
        }
        foreach (['sign-in', 'sign-in-2', 'sign-up', 'forgot-password', 'otp'] as $page) {
            Route::inertia('demo/auth/'.$page, 'admin/demo/auth/'.$page)->name('demo.auth.'.$page);
        }
        foreach ([401, 403, 404, 500, 503] as $status) {
            Route::inertia('demo/errors/'.$status, 'admin/demo/errors/'.$status)->name('demo.errors.'.$status);
        }
    });
});

require __DIR__.'/settings.php';
