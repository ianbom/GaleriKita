<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_drive_exports', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id')->unique();
            $table->bigInteger('google_drive_connection_id');
            $table->string('drive_folder_id', 255)->nullable();
            $table->string('drive_folder_name', 200)->nullable();
            $table->enum('status', ['waiting', 'queued', 'syncing', 'completed', 'partial_failed', 'failed', 'disabled'])->default('waiting');
            $table->timestampTz('started_at')->nullable();
            $table->timestampTz('completed_at')->nullable();
            $table->text('last_error')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->index(['status', 'started_at'], 'event_drive_exports_status_started_at_index');
            $table->foreign('event_id', 'event_drive_exports_event_id_foreign')->references('id')->on('events');
            $table->foreign('google_drive_connection_id', 'event_drive_exports_google_drive_connection_id_foreign')->references('id')->on('google_drive_connections');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_drive_exports');
    }
};
