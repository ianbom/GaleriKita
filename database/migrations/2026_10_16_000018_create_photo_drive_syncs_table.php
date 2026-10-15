<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photo_drive_syncs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_drive_export_id');
            $table->bigInteger('photo_id');
            $table->string('drive_file_id', 255)->nullable();
            $table->enum('status', ['pending', 'processing', 'synced', 'failed', 'skipped'])->default('pending');
            $table->integer('attempts')->default(0);
            $table->text('last_error')->nullable();
            $table->timestampTz('started_at')->nullable();
            $table->timestampTz('synced_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->unique(['event_drive_export_id', 'photo_id'], 'photo_drive_syncs_event_drive_export_id_photo_id_unique');
            $table->index(['status', 'updated_at'], 'photo_drive_syncs_status_updated_at_index');
            $table->foreign('event_drive_export_id', 'photo_drive_syncs_event_drive_export_id_foreign')->references('id')->on('event_drive_exports');
            $table->foreign('photo_id', 'photo_drive_syncs_photo_id_foreign')->references('id')->on('photos');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photo_drive_syncs');
    }
};
