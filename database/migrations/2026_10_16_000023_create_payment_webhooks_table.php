<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_webhooks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('payment_id')->nullable();
            $table->string('provider', 40)->default('midtrans');
            $table->string('provider_order_id', 50)->nullable();
            $table->string('provider_transaction_id', 150)->nullable();
            $table->string('gateway_status', 40)->nullable();
            $table->char('payload_sha256', 64);
            $table->boolean('signature_valid')->default(false);
            $table->enum('status', ['received', 'processed', 'ignored', 'failed'])->default('received');
            $table->jsonb('payload');
            $table->integer('processing_attempts')->default(0);
            $table->text('error_message')->nullable();
            $table->timestampTz('received_at');
            $table->timestampTz('processing_started_at')->nullable();
            $table->timestampTz('processed_at')->nullable();
            $table->index(['provider', 'provider_order_id', 'received_at'], 'payment_webhooks_27650cd1fe73_index');
            $table->index(['payment_id', 'received_at'], 'payment_webhooks_payment_id_received_at_index');
            $table->index(['status', 'received_at'], 'payment_webhooks_status_received_at_index');
            $table->index(['payload_sha256', 'received_at'], 'payment_webhooks_payload_sha256_received_at_index');
            $table->foreign('payment_id', 'payment_webhooks_payment_id_foreign')->references('id')->on('payments');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_webhooks');
    }
};
