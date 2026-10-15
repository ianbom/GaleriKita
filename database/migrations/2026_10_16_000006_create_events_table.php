<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->bigInteger('event_category_id')->nullable();
            $table->string('name', 180)->nullable();
            $table->string('public_slug', 150)->unique();
            $table->bigInteger('cover_media_asset_id')->nullable();
            $table->string('timezone', 64)->default('Asia/Jakarta');
            $table->timestampTz('start_at')->nullable();
            $table->timestampTz('end_at')->nullable();
            $table->enum('status', ['draft', 'pending_payment', 'published', 'cancelled', 'archived'])->default('draft');
            $table->timestampTz('activated_at')->nullable();
            $table->timestampTz('cancelled_at')->nullable();
            $table->timestampTz('archived_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->timestampTz('deleted_at')->nullable();
            $table->index(['user_id', 'created_at'], 'events_user_id_created_at_index');
            $table->index(['status', 'start_at'], 'events_status_start_at_index');
            $table->index(['status', 'end_at'], 'events_status_end_at_index');
            $table->index(['event_category_id'], 'events_event_category_id_index');
            $table->foreign('user_id', 'events_user_id_foreign')->references('id')->on('users');
            $table->foreign('event_category_id', 'events_event_category_id_foreign')->references('id')->on('event_categories');
            $table->foreign('cover_media_asset_id', 'events_cover_media_asset_id_foreign')->references('id')->on('media_assets');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
