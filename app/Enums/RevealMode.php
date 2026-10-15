<?php

namespace App\Enums;

enum RevealMode: string
{
    case Instant = 'instant';
    case AfterEvent = 'after_event';
}
