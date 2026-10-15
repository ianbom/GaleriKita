<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id');
            $table->bigInteger('event_guest_id');
            $table->bigInteger('upload_intent_id')->unique();
            $table->bigInteger('final_media_asset_id')->unique();
            $table->enum('source', ['camera', 'gallery']);
            $table->bigInteger('color_preset_id')->nullable();
            $table->bigInteger('border_preset_id')->nullable();
            $table->jsonb('filter_snapshot')->nullable();
            $table->enum('status', ['processing', 'ready', 'hidden', 'deleted'])->default('processing');
            $table->integer('likes_count')->default(0);
            $table->timestampTz('captured_at')->nullable();
            $table->timestampTz('uploaded_at');
            $table->timestampTz('deleted_at')->nullable();
            $table->bigInteger('deleted_by_user_id')->nullable();
            $table->bigInteger('deleted_by_guest_id')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->index(['event_id', 'status', 'uploaded_at'], 'photos_event_id_status_uploaded_at_index');
            $table->index(['event_guest_id', 'status', 'uploaded_at'], 'photos_event_guest_id_status_uploaded_at_index');
            $table->index(['event_id', 'deleted_at'], 'photos_event_id_deleted_at_index');
            $table->foreign('event_id', 'photos_event_id_foreign')->references('id')->on('events');
            $table->foreign('event_guest_id', 'photos_event_guest_id_foreign')->references('id')->on('event_guests');
            $table->foreign('upload_intent_id', 'photos_upload_intent_id_foreign')->references('id')->on('upload_intents');
            $table->foreign('final_media_asset_id', 'photos_final_media_asset_id_foreign')->references('id')->on('media_assets');
            $table->foreign('color_preset_id', 'photos_color_preset_id_foreign')->references('id')->on('photo_presets');
            $table->foreign('border_preset_id', 'photos_border_preset_id_foreign')->references('id')->on('photo_presets');
            $table->foreign('deleted_by_user_id', 'photos_deleted_by_user_id_foreign')->references('id')->on('users');
            $table->foreign('deleted_by_guest_id', 'photos_deleted_by_guest_id_foreign')->references('id')->on('event_guests');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
