<?php

namespace App\Enums;

enum ActivityActorType: string
{
    case User = 'user';
    case Guest = 'guest';
    case System = 'system';
}
