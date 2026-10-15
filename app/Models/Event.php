<?php

namespace App\Models;

use App\Enums\EventStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['user_id', 'event_category_id', 'name', 'public_slug', 'cover_media_asset_id', 'timezone', 'start_at', 'end_at', 'status', 'activated_at', 'cancelled_at', 'archived_at'])]
class Event extends Model
{
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'event_category_id' => 'integer',
            'cover_media_asset_id' => 'integer',
            'start_at' => 'datetime',
            'end_at' => 'datetime',
            'status' => EventStatus::class,
            'activated_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'archived_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withTrashed();
    }

    /** @return BelongsTo<EventCategory, $this> */
    public function category(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    /** @return BelongsTo<MediaAsset, $this> */
    public function coverMediaAsset(): BelongsTo
    {
        return $this->belongsTo(MediaAsset::class, 'cover_media_asset_id');
    }

    /** @return HasOne<EventSetting, $this> */
    public function settings(): HasOne
    {
        return $this->hasOne(EventSetting::class, 'event_id');
    }

    /** @return HasOne<EventEntitlement, $this> */
    public function entitlement(): HasOne
    {
        return $this->hasOne(EventEntitlement::class, 'event_id');
    }

    /** @return HasMany<Order, $this> */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'event_id');
    }

    /** @return HasMany<EventPlanChange, $this> */
    public function planChanges(): HasMany
    {
        return $this->hasMany(EventPlanChange::class, 'event_id');
    }

    /** @return HasMany<EventGuest, $this> */
    public function guests(): HasMany
    {
        return $this->hasMany(EventGuest::class, 'event_id');
    }

    /** @return HasMany<UploadIntent, $this> */
    public function uploadIntents(): HasMany
    {
        return $this->hasMany(UploadIntent::class, 'event_id');
    }

    /** @return HasMany<Photo, $this> */
    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class, 'event_id');
    }

    /** @return HasOne<EventDriveExport, $this> */
    public function driveExport(): HasOne
    {
        return $this->hasOne(EventDriveExport::class, 'event_id');
    }

    /** @return HasMany<ActivityLog, $this> */
    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class, 'event_id');
    }
}
