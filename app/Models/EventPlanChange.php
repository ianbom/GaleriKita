<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['event_id', 'order_id', 'previous_plan_version_id', 'new_plan_version_id', 'previous_photographer_limit', 'previous_photos_per_photographer', 'new_photographer_limit', 'new_photos_per_photographer', 'previous_plan_value_idr', 'new_plan_value_idr', 'paid_difference_idr', 'applied_at'])]
class EventPlanChange extends Model
{
    public $timestamps = false;

    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'order_id' => 'integer',
            'previous_plan_version_id' => 'integer',
            'new_plan_version_id' => 'integer',
            'previous_photographer_limit' => 'integer',
            'previous_photos_per_photographer' => 'integer',
            'new_photographer_limit' => 'integer',
            'new_photos_per_photographer' => 'integer',
            'previous_plan_value_idr' => 'integer',
            'new_plan_value_idr' => 'integer',
            'paid_difference_idr' => 'integer',
            'applied_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    /** @return BelongsTo<Order, $this> */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /** @return BelongsTo<PlanVersion, $this> */
    public function previousPlanVersion(): BelongsTo
    {
        return $this->belongsTo(PlanVersion::class, 'previous_plan_version_id');
    }

    /** @return BelongsTo<PlanVersion, $this> */
    public function newPlanVersion(): BelongsTo
    {
        return $this->belongsTo(PlanVersion::class, 'new_plan_version_id');
    }
}
