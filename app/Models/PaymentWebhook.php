<?php

namespace App\Models;

use App\Enums\WebhookStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['payment_id', 'provider', 'provider_order_id', 'provider_transaction_id', 'gateway_status', 'payload_sha256', 'signature_valid', 'status', 'payload', 'processing_attempts', 'error_message', 'received_at', 'processing_started_at', 'processed_at'])]
class PaymentWebhook extends Model
{
    public $timestamps = false;

    protected function casts(): array
    {
        return [
            'payment_id' => 'integer',
            'signature_valid' => 'boolean',
            'status' => WebhookStatus::class,
            'payload' => 'array',
            'processing_attempts' => 'integer',
            'received_at' => 'datetime',
            'processing_started_at' => 'datetime',
            'processed_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Payment, $this> */
    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }
}
