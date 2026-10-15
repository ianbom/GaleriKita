<?php

namespace App\Enums;

enum OrderType: string
{
    case Initial = 'initial';
    case Upgrade = 'upgrade';
}
