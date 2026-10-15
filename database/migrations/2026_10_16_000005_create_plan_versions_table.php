<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plan_versions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('plan_id');
            $table->integer('version_number');
            $table->integer('photographer_limit');
            $table->integer('photos_per_photographer');
            $table->bigInteger('price_idr');
            $table->boolean('is_current')->default(false);
            $table->timestampTz('published_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->unique(['plan_id', 'version_number'], 'plan_versions_plan_id_version_number_unique');
            $table->index(['plan_id', 'is_current'], 'plan_versions_plan_id_is_current_index');
            $table->foreign('plan_id', 'plan_versions_plan_id_foreign')->references('id')->on('plans');
        });

        DB::statement('CREATE UNIQUE INDEX plan_versions_one_current_per_plan ON plan_versions (plan_id) WHERE is_current');
    }

    public function down(): void
    {
        Schema::dropIfExists('plan_versions');
    }
};
