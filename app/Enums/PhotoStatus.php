<?php

namespace App\Enums;

enum PhotoStatus: string
{
    case Processing = 'processing';
    case Ready = 'ready';
    case Hidden = 'hidden';
    case Deleted = 'deleted';
}
