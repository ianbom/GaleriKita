<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('voucher_redemptions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('voucher_id');
            $table->bigInteger('user_id');
            $table->bigInteger('order_id')->unique();
            $table->enum('status', ['reserved', 'redeemed', 'released'])->default('reserved');
            $table->bigInteger('discount_idr');
            $table->timestampTz('reserved_at');
            $table->timestampTz('reservation_expires_at')->nullable();
            $table->timestampTz('redeemed_at')->nullable();
            $table->timestampTz('released_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->index(['voucher_id', 'status'], 'voucher_redemptions_voucher_id_status_index');
            $table->index(['voucher_id', 'user_id', 'status'], 'voucher_redemptions_voucher_id_user_id_status_index');
            $table->index(['status', 'reservation_expires_at'], 'voucher_redemptions_status_reservation_expires_at_index');
            $table->foreign('voucher_id', 'voucher_redemptions_voucher_id_foreign')->references('id')->on('vouchers');
            $table->foreign('user_id', 'voucher_redemptions_user_id_foreign')->references('id')->on('users');
            $table->foreign('order_id', 'voucher_redemptions_order_id_foreign')->references('id')->on('orders');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voucher_redemptions');
    }
};
