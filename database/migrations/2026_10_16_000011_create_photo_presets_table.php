<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photo_presets', function (Blueprint $table) {
            $table->id();
            $table->enum('kind', ['color', 'border']);
            $table->string('name', 100);
            $table->string('code', 100)->unique();
            $table->integer('version_number')->default(1);
            $table->jsonb('effect_settings');
            $table->bigInteger('preview_media_asset_id')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->index(['kind', 'is_active', 'sort_order'], 'photo_presets_kind_is_active_sort_order_index');
            $table->foreign('preview_media_asset_id', 'photo_presets_preview_media_asset_id_foreign')->references('id')->on('media_assets');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photo_presets');
    }
};
