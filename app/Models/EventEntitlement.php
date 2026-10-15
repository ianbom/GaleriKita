<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['event_id', 'current_plan_version_id', 'photographer_limit', 'photos_per_photographer', 'current_plan_value_idr', 'photographers_used', 'version', 'activated_at'])]
class EventEntitlement extends Model
{
    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'current_plan_version_id' => 'integer',
            'photographer_limit' => 'integer',
            'photos_per_photographer' => 'integer',
            'current_plan_value_idr' => 'integer',
            'photographers_used' => 'integer',
            'version' => 'integer',
            'activated_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    /** @return BelongsTo<PlanVersion, $this> */
    public function currentPlanVersion(): BelongsTo
    {
        return $this->belongsTo(PlanVersion::class, 'current_plan_version_id');
    }
}
