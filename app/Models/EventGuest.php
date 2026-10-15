<?php

namespace App\Models;

use App\Enums\GuestStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['event_id', 'display_name', 'status', 'uploads_used', 'uploads_reserved', 'joined_at'])]
class EventGuest extends Model
{
    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'status' => GuestStatus::class,
            'uploads_used' => 'integer',
            'uploads_reserved' => 'integer',
            'joined_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    /** @return HasOne<GuestSession, $this> */
    public function session(): HasOne
    {
        return $this->hasOne(GuestSession::class, 'event_guest_id');
    }

    /** @return HasMany<UploadIntent, $this> */
    public function uploadIntents(): HasMany
    {
        return $this->hasMany(UploadIntent::class, 'event_guest_id');
    }

    /** @return HasMany<Photo, $this> */
    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class, 'event_guest_id');
    }

    /** @return HasMany<Photo, $this> */
    public function deletedPhotos(): HasMany
    {
        return $this->hasMany(Photo::class, 'deleted_by_guest_id');
    }

    /** @return HasMany<PhotoLike, $this> */
    public function likes(): HasMany
    {
        return $this->hasMany(PhotoLike::class, 'event_guest_id');
    }

    /** @return BelongsToMany<Photo, $this> */
    public function likedPhotos(): BelongsToMany
    {
        return $this->belongsToMany(Photo::class, 'photo_likes', 'event_guest_id', 'photo_id')->withPivot(['id', 'created_at']);
    }

    /** @return HasMany<ActivityLog, $this> */
    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class, 'actor_guest_id');
    }
}
