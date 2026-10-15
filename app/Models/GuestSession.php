<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['event_guest_id', 'token_hash', 'last_seen_at', 'expires_at', 'revoked_at'])]
#[Hidden(['token_hash'])]
class GuestSession extends Model
{
    protected function casts(): array
    {
        return [
            'event_guest_id' => 'integer',
            'last_seen_at' => 'datetime',
            'expires_at' => 'datetime',
            'revoked_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<EventGuest, $this> */
    public function eventGuest(): BelongsTo
    {
        return $this->belongsTo(EventGuest::class, 'event_guest_id');
    }
}
