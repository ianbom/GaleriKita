<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('upload_intents', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id');
            $table->bigInteger('event_guest_id');
            $table->string('client_upload_id', 100);
            $table->string('storage_disk', 40);
            $table->string('reserved_storage_key', 512);
            $table->string('expected_mime_type', 100)->nullable();
            $table->bigInteger('max_bytes');
            $table->enum('status', ['reserved', 'completed', 'expired', 'cancelled'])->default('reserved');
            $table->timestampTz('reserved_at');
            $table->timestampTz('expires_at');
            $table->timestampTz('finalized_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->unique(['event_guest_id', 'client_upload_id'], 'upload_intents_event_guest_id_client_upload_id_unique');
            $table->unique(['storage_disk', 'reserved_storage_key'], 'upload_intents_storage_disk_reserved_storage_key_unique');
            $table->index(['status', 'expires_at'], 'upload_intents_status_expires_at_index');
            $table->index(['event_id', 'created_at'], 'upload_intents_event_id_created_at_index');
            $table->foreign('event_id', 'upload_intents_event_id_foreign')->references('id')->on('events');
            $table->foreign('event_guest_id', 'upload_intents_event_guest_id_foreign')->references('id')->on('event_guests');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('upload_intents');
    }
};
