<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('voucher_plans', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('voucher_id');
            $table->bigInteger('plan_id');
            $table->timestampTz('created_at')->nullable();
            $table->unique(['voucher_id', 'plan_id'], 'voucher_plans_voucher_id_plan_id_unique');
            $table->index(['plan_id'], 'voucher_plans_plan_id_index');
            $table->foreign('voucher_id', 'voucher_plans_voucher_id_foreign')->references('id')->on('vouchers');
            $table->foreign('plan_id', 'voucher_plans_plan_id_foreign')->references('id')->on('plans');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voucher_plans');
    }
};
