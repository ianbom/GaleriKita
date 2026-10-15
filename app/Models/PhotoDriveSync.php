<?php

namespace App\Models;

use App\Enums\DrivePhotoStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['event_drive_export_id', 'photo_id', 'drive_file_id', 'status', 'attempts', 'last_error', 'started_at', 'synced_at'])]
class PhotoDriveSync extends Model
{
    protected function casts(): array
    {
        return [
            'event_drive_export_id' => 'integer',
            'photo_id' => 'integer',
            'status' => DrivePhotoStatus::class,
            'attempts' => 'integer',
            'started_at' => 'datetime',
            'synced_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<EventDriveExport, $this> */
    public function eventDriveExport(): BelongsTo
    {
        return $this->belongsTo(EventDriveExport::class, 'event_drive_export_id');
    }

    /** @return BelongsTo<Photo, $this> */
    public function photo(): BelongsTo
    {
        return $this->belongsTo(Photo::class, 'photo_id')->withTrashed();
    }
}
