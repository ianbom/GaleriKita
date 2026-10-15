<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['photo_id', 'event_guest_id'])]
class PhotoLike extends Model
{
    public const UPDATED_AT = null;

    protected function casts(): array
    {
        return [
            'photo_id' => 'integer',
            'event_guest_id' => 'integer',
            'created_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Photo, $this> */
    public function photo(): BelongsTo
    {
        return $this->belongsTo(Photo::class, 'photo_id')->withTrashed();
    }

    /** @return BelongsTo<EventGuest, $this> */
    public function eventGuest(): BelongsTo
    {
        return $this->belongsTo(EventGuest::class, 'event_guest_id');
    }
}
