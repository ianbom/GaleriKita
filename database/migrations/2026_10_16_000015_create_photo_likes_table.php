<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photo_likes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('photo_id');
            $table->bigInteger('event_guest_id');
            $table->timestampTz('created_at')->nullable();
            $table->unique(['photo_id', 'event_guest_id'], 'photo_likes_photo_id_event_guest_id_unique');
            $table->index(['event_guest_id'], 'photo_likes_event_guest_id_index');
            $table->foreign('photo_id', 'photo_likes_photo_id_foreign')->references('id')->on('photos');
            $table->foreign('event_guest_id', 'photo_likes_event_guest_id_foreign')->references('id')->on('event_guests');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photo_likes');
    }
};
