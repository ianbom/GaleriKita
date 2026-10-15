<?php

namespace App\Models;

use App\Enums\DriveConnectionStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['user_id', 'google_subject', 'google_email', 'refresh_token_encrypted', 'granted_scopes', 'status', 'connected_at', 'last_checked_at'])]
#[Hidden(['refresh_token_encrypted'])]
class GoogleDriveConnection extends Model
{
    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'refresh_token_encrypted' => 'encrypted',
            'status' => DriveConnectionStatus::class,
            'connected_at' => 'datetime',
            'last_checked_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withTrashed();
    }

    /** @return HasMany<EventDriveExport, $this> */
    public function eventExports(): HasMany
    {
        return $this->hasMany(EventDriveExport::class, 'google_drive_connection_id');
    }
}
