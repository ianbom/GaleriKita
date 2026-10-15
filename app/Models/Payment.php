<?php

namespace App\Models;

use App\Enums\PaymentEnvironment;
use App\Enums\PaymentStatus;
use App\Enums\PaymentVerificationSource;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['order_id', 'provider', 'environment', 'provider_order_id', 'provider_transaction_id', 'snap_token_encrypted', 'snap_redirect_url', 'snap_created_at', 'snap_expires_at', 'gateway_expires_at', 'payment_method', 'amount_idr', 'currency', 'status', 'gateway_status', 'gateway_fraud_status', 'gateway_status_code', 'gateway_gross_amount_idr', 'verified_via', 'last_checked_at', 'provider_response', 'last_error', 'paid_at', 'expired_at'])]
#[Hidden(['snap_token_encrypted'])]
class Payment extends Model
{
    protected function casts(): array
    {
        return [
            'order_id' => 'integer',
            'environment' => PaymentEnvironment::class,
            'snap_token_encrypted' => 'encrypted',
            'snap_created_at' => 'datetime',
            'snap_expires_at' => 'datetime',
            'gateway_expires_at' => 'datetime',
            'amount_idr' => 'integer',
            'status' => PaymentStatus::class,
            'gateway_gross_amount_idr' => 'integer',
            'verified_via' => PaymentVerificationSource::class,
            'last_checked_at' => 'datetime',
            'provider_response' => 'array',
            'paid_at' => 'datetime',
            'expired_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Order, $this> */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /** @return HasMany<PaymentWebhook, $this> */
    public function webhooks(): HasMany
    {
        return $this->hasMany(PaymentWebhook::class, 'payment_id');
    }
}
