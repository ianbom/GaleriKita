<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_code', 100)->unique();
            $table->bigInteger('user_id');
            $table->bigInteger('event_id');
            $table->enum('type', ['initial', 'upgrade']);
            $table->bigInteger('target_plan_version_id');
            $table->integer('base_entitlement_version')->nullable();
            $table->integer('photographer_limit_snapshot');
            $table->integer('photos_per_photographer_snapshot');
            $table->bigInteger('previous_plan_value_idr')->default(0);
            $table->bigInteger('target_plan_value_idr');
            $table->bigInteger('subtotal_idr');
            $table->bigInteger('voucher_id')->nullable();
            $table->string('voucher_code_snapshot', 80)->nullable();
            $table->enum('voucher_discount_type_snapshot', ['percentage', 'fixed'])->nullable();
            $table->bigInteger('voucher_discount_value_snapshot')->nullable();
            $table->bigInteger('discount_idr')->default(0);
            $table->bigInteger('amount_due_idr');
            $table->char('currency', 3)->default('IDR');
            $table->enum('status', ['pending', 'paid', 'failed', 'expired', 'cancelled'])->default('pending');
            $table->enum('settlement_source', ['midtrans', 'voucher_full_discount'])->nullable();
            $table->enum('fulfillment_status', ['pending', 'applied', 'requires_review'])->default('pending');
            $table->text('fulfillment_error')->nullable();
            $table->timestampTz('expires_at')->nullable();
            $table->timestampTz('paid_at')->nullable();
            $table->timestampTz('fulfilled_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->index(['event_id', 'type', 'status'], 'orders_event_id_type_status_index');
            $table->index(['event_id', 'fulfillment_status'], 'orders_event_id_fulfillment_status_index');
            $table->index(['user_id', 'created_at'], 'orders_user_id_created_at_index');
            $table->index(['voucher_id', 'status'], 'orders_voucher_id_status_index');
            $table->foreign('user_id', 'orders_user_id_foreign')->references('id')->on('users');
            $table->foreign('event_id', 'orders_event_id_foreign')->references('id')->on('events');
            $table->foreign('target_plan_version_id', 'orders_target_plan_version_id_foreign')->references('id')->on('plan_versions');
            $table->foreign('voucher_id', 'orders_voucher_id_foreign')->references('id')->on('vouchers');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
