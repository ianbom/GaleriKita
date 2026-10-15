<?php

namespace App\Models;

use App\Enums\OrderFulfillmentStatus;
use App\Enums\OrderSettlementSource;
use App\Enums\OrderStatus;
use App\Enums\OrderType;
use App\Enums\VoucherDiscountType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['order_code', 'user_id', 'event_id', 'type', 'target_plan_version_id', 'base_entitlement_version', 'photographer_limit_snapshot', 'photos_per_photographer_snapshot', 'previous_plan_value_idr', 'target_plan_value_idr', 'subtotal_idr', 'voucher_id', 'voucher_code_snapshot', 'voucher_discount_type_snapshot', 'voucher_discount_value_snapshot', 'discount_idr', 'amount_due_idr', 'currency', 'status', 'settlement_source', 'fulfillment_status', 'fulfillment_error', 'expires_at', 'paid_at', 'fulfilled_at'])]
class Order extends Model
{
    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'event_id' => 'integer',
            'type' => OrderType::class,
            'target_plan_version_id' => 'integer',
            'base_entitlement_version' => 'integer',
            'photographer_limit_snapshot' => 'integer',
            'photos_per_photographer_snapshot' => 'integer',
            'previous_plan_value_idr' => 'integer',
            'target_plan_value_idr' => 'integer',
            'subtotal_idr' => 'integer',
            'voucher_id' => 'integer',
            'voucher_discount_type_snapshot' => VoucherDiscountType::class,
            'voucher_discount_value_snapshot' => 'integer',
            'discount_idr' => 'integer',
            'amount_due_idr' => 'integer',
            'status' => OrderStatus::class,
            'settlement_source' => OrderSettlementSource::class,
            'fulfillment_status' => OrderFulfillmentStatus::class,
            'expires_at' => 'datetime',
            'paid_at' => 'datetime',
            'fulfilled_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withTrashed();
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    /** @return BelongsTo<PlanVersion, $this> */
    public function targetPlanVersion(): BelongsTo
    {
        return $this->belongsTo(PlanVersion::class, 'target_plan_version_id');
    }

    /** @return BelongsTo<Voucher, $this> */
    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class, 'voucher_id')->withTrashed();
    }

    /** @return HasMany<Payment, $this> */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'order_id');
    }

    /** @return HasOne<EventPlanChange, $this> */
    public function planChange(): HasOne
    {
        return $this->hasOne(EventPlanChange::class, 'order_id');
    }

    /** @return HasOne<VoucherRedemption, $this> */
    public function voucherRedemption(): HasOne
    {
        return $this->hasOne(VoucherRedemption::class, 'order_id');
    }
}
