<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_settings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id')->unique();
            $table->enum('visibility', ['private', 'public'])->default('private');
            $table->enum('photo_reveal_mode', ['instant', 'after_event'])->default('after_event');
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->foreign('event_id', 'event_settings_event_id_foreign')->references('id')->on('events');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_settings');
    }
};
