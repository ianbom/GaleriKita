<?php

namespace App\Models;

use App\Enums\ActivityActorType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['event_id', 'actor_type', 'actor_user_id', 'actor_guest_id', 'action', 'subject_type', 'subject_id', 'changes'])]
class ActivityLog extends Model
{
    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'actor_type' => ActivityActorType::class,
            'actor_user_id' => 'integer',
            'actor_guest_id' => 'integer',
            'subject_id' => 'integer',
            'changes' => 'array',
            'created_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    /** @return BelongsTo<User, $this> */
    public function actorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id')->withTrashed();
    }

    /** @return BelongsTo<EventGuest, $this> */
    public function actorGuest(): BelongsTo
    {
        return $this->belongsTo(EventGuest::class, 'actor_guest_id');
    }
}
