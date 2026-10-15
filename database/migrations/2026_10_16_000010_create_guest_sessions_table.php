<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guest_sessions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_guest_id')->unique();
            $table->char('token_hash', 64)->unique();
            $table->timestampTz('last_seen_at')->nullable();
            $table->timestampTz('expires_at')->nullable();
            $table->timestampTz('revoked_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->foreign('event_guest_id', 'guest_sessions_event_guest_id_foreign')->references('id')->on('event_guests');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guest_sessions');
    }
};
