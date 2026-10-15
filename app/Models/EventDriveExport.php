<?php

namespace App\Models;

use App\Enums\DriveExportStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['event_id', 'google_drive_connection_id', 'drive_folder_id', 'drive_folder_name', 'status', 'started_at', 'completed_at', 'last_error'])]
class EventDriveExport extends Model
{
    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'google_drive_connection_id' => 'integer',
            'status' => DriveExportStatus::class,
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    /** @return BelongsTo<GoogleDriveConnection, $this> */
    public function connection(): BelongsTo
    {
        return $this->belongsTo(GoogleDriveConnection::class, 'google_drive_connection_id');
    }

    /** @return HasMany<PhotoDriveSync, $this> */
    public function photoSyncs(): HasMany
    {
        return $this->hasMany(PhotoDriveSync::class, 'event_drive_export_id');
    }
}
