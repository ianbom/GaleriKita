<?php

namespace App\Models;

use App\Enums\PhotoSource;
use App\Enums\PhotoStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['event_id', 'event_guest_id', 'upload_intent_id', 'final_media_asset_id', 'source', 'color_preset_id', 'border_preset_id', 'filter_snapshot', 'status', 'likes_count', 'captured_at', 'uploaded_at', 'deleted_by_user_id', 'deleted_by_guest_id'])]
class Photo extends Model
{
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'event_guest_id' => 'integer',
            'upload_intent_id' => 'integer',
            'final_media_asset_id' => 'integer',
            'source' => PhotoSource::class,
            'color_preset_id' => 'integer',
            'border_preset_id' => 'integer',
            'filter_snapshot' => 'array',
            'status' => PhotoStatus::class,
            'likes_count' => 'integer',
            'captured_at' => 'datetime',
            'uploaded_at' => 'datetime',
            'deleted_at' => 'datetime',
            'deleted_by_user_id' => 'integer',
            'deleted_by_guest_id' => 'integer',
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

    /** @return BelongsTo<UploadIntent, $this> */
    public function uploadIntent(): BelongsTo
    {
        return $this->belongsTo(UploadIntent::class, 'upload_intent_id');
    }

    /** @return BelongsTo<MediaAsset, $this> */
    public function finalMediaAsset(): BelongsTo
    {
        return $this->belongsTo(MediaAsset::class, 'final_media_asset_id');
    }

    /** @return BelongsTo<PhotoPreset, $this> */
    public function colorPreset(): BelongsTo
    {
        return $this->belongsTo(PhotoPreset::class, 'color_preset_id');
    }

    /** @return BelongsTo<PhotoPreset, $this> */
    public function borderPreset(): BelongsTo
    {
        return $this->belongsTo(PhotoPreset::class, 'border_preset_id');
    }

    /** @return BelongsTo<User, $this> */
    public function deletedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'deleted_by_user_id')->withTrashed();
    }

    /** @return BelongsTo<EventGuest, $this> */
    public function deletedByGuest(): BelongsTo
    {
        return $this->belongsTo(EventGuest::class, 'deleted_by_guest_id');
    }

    /** @return HasMany<PhotoVariant, $this> */
    public function variants(): HasMany
    {
        return $this->hasMany(PhotoVariant::class, 'photo_id');
    }

    /** @return HasMany<PhotoLike, $this> */
    public function likes(): HasMany
    {
        return $this->hasMany(PhotoLike::class, 'photo_id');
    }

    /** @return BelongsToMany<EventGuest, $this> */
    public function likedByGuests(): BelongsToMany
    {
        return $this->belongsToMany(EventGuest::class, 'photo_likes', 'photo_id', 'event_guest_id')->withPivot(['id', 'created_at']);
    }

    /** @return HasMany<PhotoDriveSync, $this> */
    public function driveSyncs(): HasMany
    {
        return $this->hasMany(PhotoDriveSync::class, 'photo_id');
    }
}
