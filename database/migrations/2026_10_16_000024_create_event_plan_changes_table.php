<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_plan_changes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id');
            $table->bigInteger('order_id')->unique();
            $table->bigInteger('previous_plan_version_id')->nullable();
            $table->bigInteger('new_plan_version_id');
            $table->integer('previous_photographer_limit')->nullable();
            $table->integer('previous_photos_per_photographer')->nullable();
            $table->integer('new_photographer_limit');
            $table->integer('new_photos_per_photographer');
            $table->bigInteger('previous_plan_value_idr')->default(0);
            $table->bigInteger('new_plan_value_idr');
            $table->bigInteger('paid_difference_idr');
            $table->timestampTz('applied_at');
            $table->index(['event_id', 'applied_at'], 'event_plan_changes_event_id_applied_at_index');
            $table->foreign('event_id', 'event_plan_changes_event_id_foreign')->references('id')->on('events');
            $table->foreign('order_id', 'event_plan_changes_order_id_foreign')->references('id')->on('orders');
            $table->foreign('previous_plan_version_id', 'event_plan_changes_previous_plan_version_id_foreign')->references('id')->on('plan_versions');
            $table->foreign('new_plan_version_id', 'event_plan_changes_new_plan_version_id_foreign')->references('id')->on('plan_versions');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_plan_changes');
    }
};
