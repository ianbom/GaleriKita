<?php

namespace App\Enums;

enum DriveExportStatus: string
{
    case Waiting = 'waiting';
    case Queued = 'queued';
    case Syncing = 'syncing';
    case Completed = 'completed';
    case PartialFailed = 'partial_failed';
    case Failed = 'failed';
    case Disabled = 'disabled';
}
