<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_assets', function (Blueprint $table) {
            $table->id();
            $table->string('storage_disk', 40);
            $table->string('storage_key', 512);
            $table->string('provider_asset_id', 255)->nullable();
            $table->string('provider_resource_type', 30)->nullable();
            $table->string('provider_delivery_type', 30)->nullable();
            $table->bigInteger('provider_version')->nullable();
            $table->string('mime_type', 100);
            $table->bigInteger('file_size_bytes');
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->char('checksum_sha256', 64)->nullable();
            $table->enum('status', ['pending', 'ready', 'delete_pending', 'deleted', 'failed'])->default('pending');
            $table->timestampTz('uploaded_at')->nullable();
            $table->timestampTz('deleted_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->unique(['storage_disk', 'storage_key'], 'media_assets_storage_disk_storage_key_unique');
            $table->index(['storage_disk', 'provider_asset_id'], 'media_assets_storage_disk_provider_asset_id_index');
            $table->index(['status', 'created_at'], 'media_assets_status_created_at_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_assets');
    }
};
