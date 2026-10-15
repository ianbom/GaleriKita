<?php

namespace App\Enums;

enum VoucherApplicability: string
{
    case Initial = 'initial';
    case Upgrade = 'upgrade';
    case Both = 'both';
}
