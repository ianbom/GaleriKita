<?php

namespace App\Models;

use App\Enums\UploadStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['event_id', 'event_guest_id', 'client_upload_id', 'storage_disk', 'reserved_storage_key', 'expected_mime_type', 'max_bytes', 'status', 'reserved_at', 'expires_at', 'finalized_at'])]
class UploadIntent extends Model
{
    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'event_guest_id' => 'integer',
            'max_bytes' => 'integer',
            'status' => UploadStatus::class,
            'reserved_at' => 'datetime',
            'expires_at' => 'datetime',
            'finalized_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    /** @return BelongsTo<EventGuest, $this> */
    public function eventGuest(): BelongsTo
    {
        return $this->belongsTo(EventGuest::class, 'event_guest_id');
    }

    /** @return HasOne<Photo, $this> */
    public function photo(): HasOne
    {
        return $this->hasOne(Photo::class, 'upload_intent_id');
    }
}
