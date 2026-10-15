<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_entitlements', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id')->unique();
            $table->bigInteger('current_plan_version_id');
            $table->integer('photographer_limit');
            $table->integer('photos_per_photographer');
            $table->bigInteger('current_plan_value_idr');
            $table->integer('photographers_used')->default(0);
            $table->integer('version')->default(1);
            $table->timestampTz('activated_at');
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->foreign('event_id', 'event_entitlements_event_id_foreign')->references('id')->on('events');
            $table->foreign('current_plan_version_id', 'event_entitlements_current_plan_version_id_foreign')->references('id')->on('plan_versions');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_entitlements');
    }
};
