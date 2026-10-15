<?php

namespace App\Enums;

enum DriveConnectionStatus: string
{
    case Active = 'active';
    case NeedsReauth = 'needs_reauth';
    case Revoked = 'revoked';
}
