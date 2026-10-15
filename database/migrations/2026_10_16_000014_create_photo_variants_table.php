<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photo_variants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('photo_id');
            $table->enum('kind', ['thumbnail', 'preview']);
            $table->bigInteger('media_asset_id')->unique();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->unique(['photo_id', 'kind'], 'photo_variants_photo_id_kind_unique');
            $table->foreign('photo_id', 'photo_variants_photo_id_foreign')->references('id')->on('photos');
            $table->foreign('media_asset_id', 'photo_variants_media_asset_id_foreign')->references('id')->on('media_assets');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photo_variants');
    }
};
