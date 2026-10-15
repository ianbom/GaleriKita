<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['plan_id', 'version_number', 'photographer_limit', 'photos_per_photographer', 'price_idr', 'is_current', 'published_at'])]
class PlanVersion extends Model
{
    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'plan_id' => 'integer',
            'version_number' => 'integer',
            'photographer_limit' => 'integer',
            'photos_per_photographer' => 'integer',
            'price_idr' => 'integer',
            'is_current' => 'boolean',
            'published_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Plan, $this> */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'plan_id')->withTrashed();
    }

    /** @return HasMany<EventEntitlement, $this> */
    public function eventEntitlements(): HasMany
    {
        return $this->hasMany(EventEntitlement::class, 'current_plan_version_id');
    }

    /** @return HasMany<Order, $this> */
    public function targetOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'target_plan_version_id');
    }

    /** @return HasMany<EventPlanChange, $this> */
    public function previousPlanChanges(): HasMany
    {
        return $this->hasMany(EventPlanChange::class, 'previous_plan_version_id');
    }

    /** @return HasMany<EventPlanChange, $this> */
    public function newPlanChanges(): HasMany
    {
        return $this->hasMany(EventPlanChange::class, 'new_plan_version_id');
    }
}
