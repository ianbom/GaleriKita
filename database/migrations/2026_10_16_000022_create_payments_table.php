<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order_id');
            $table->string('provider', 40)->default('midtrans');
            $table->enum('environment', ['sandbox', 'production']);
            $table->string('provider_order_id', 50)->unique();
            $table->string('provider_transaction_id', 150)->nullable()->unique();
            $table->text('snap_token_encrypted')->nullable();
            $table->text('snap_redirect_url')->nullable();
            $table->timestampTz('snap_created_at')->nullable();
            $table->timestampTz('snap_expires_at')->nullable();
            $table->timestampTz('gateway_expires_at')->nullable();
            $table->string('payment_method', 80)->nullable();
            $table->bigInteger('amount_idr');
            $table->char('currency', 3)->default('IDR');
            $table->enum('status', ['initiating', 'pending', 'paid', 'failed', 'expired', 'cancelled', 'requires_review'])->default('initiating');
            $table->string('gateway_status', 40)->nullable();
            $table->string('gateway_fraud_status', 30)->nullable();
            $table->string('gateway_status_code', 10)->nullable();
            $table->bigInteger('gateway_gross_amount_idr')->nullable();
            $table->enum('verified_via', ['webhook', 'status_api'])->nullable();
            $table->timestampTz('last_checked_at')->nullable();
            $table->jsonb('provider_response')->nullable();
            $table->text('last_error')->nullable();
            $table->timestampTz('paid_at')->nullable();
            $table->timestampTz('expired_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->index(['order_id', 'status'], 'payments_order_id_status_index');
            $table->index(['status', 'last_checked_at'], 'payments_status_last_checked_at_index');
            $table->index(['environment', 'gateway_status'], 'payments_environment_gateway_status_index');
            $table->foreign('order_id', 'payments_order_id_foreign')->references('id')->on('orders');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
