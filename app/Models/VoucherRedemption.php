<?php

namespace App\Models;

use App\Enums\VoucherRedemptionStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['voucher_id', 'user_id', 'order_id', 'status', 'discount_idr', 'reserved_at', 'reservation_expires_at', 'redeemed_at', 'released_at'])]
class VoucherRedemption extends Model
{
    protected function casts(): array
    {
        return [
            'voucher_id' => 'integer',
            'user_id' => 'integer',
            'order_id' => 'integer',
            'status' => VoucherRedemptionStatus::class,
            'discount_idr' => 'integer',
            'reserved_at' => 'datetime',
            'reservation_expires_at' => 'datetime',
            'redeemed_at' => 'datetime',
            'released_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Voucher, $this> */
    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class, 'voucher_id')->withTrashed();
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withTrashed();
    }

    /** @return BelongsTo<Order, $this> */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
