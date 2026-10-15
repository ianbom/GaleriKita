<?php

namespace App\Models;

use App\Enums\VoucherApplicability;
use App\Enums\VoucherDiscountType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

#[Fillable(['code', 'name', 'description', 'created_by_user_id', 'discount_type', 'discount_value', 'max_discount_idr', 'min_order_idr', 'applicability', 'usage_limit', 'usage_limit_per_user', 'starts_at', 'expires_at', 'is_active'])]
class Voucher extends Model
{
    use SoftDeletes;

    /** @return Attribute<string, string> */
    protected function code(): Attribute
    {
        return Attribute::make(set: static fn (string $value): string => Str::upper(trim($value)));
    }

    protected function casts(): array
    {
        return [
            'created_by_user_id' => 'integer',
            'discount_type' => VoucherDiscountType::class,
            'discount_value' => 'integer',
            'max_discount_idr' => 'integer',
            'min_order_idr' => 'integer',
            'applicability' => VoucherApplicability::class,
            'usage_limit' => 'integer',
            'usage_limit_per_user' => 'integer',
            'starts_at' => 'datetime',
            'expires_at' => 'datetime',
            'is_active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /** @return HasMany<Order, $this> */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'voucher_id');
    }

    /** @return BelongsTo<User, $this> */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id')->withTrashed();
    }

    /** @return HasMany<VoucherPlan, $this> */
    public function voucherPlans(): HasMany
    {
        return $this->hasMany(VoucherPlan::class, 'voucher_id');
    }

    /** @return HasMany<VoucherRedemption, $this> */
    public function redemptions(): HasMany
    {
        return $this->hasMany(VoucherRedemption::class, 'voucher_id');
    }

    /** @return BelongsToMany<Plan, $this> */
    public function plans(): BelongsToMany
    {
        return $this->belongsToMany(Plan::class, 'voucher_plans')->withPivot(['id', 'created_at']);
    }
}
