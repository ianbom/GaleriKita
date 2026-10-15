<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_accounts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->enum('provider', ['google']);
            $table->string('provider_user_id', 191);
            $table->string('provider_email', 150)->nullable();
            $table->timestampTz('linked_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->unique(['provider', 'provider_user_id'], 'social_accounts_provider_provider_user_id_unique');
            $table->unique(['user_id', 'provider'], 'social_accounts_user_id_provider_unique');
            $table->foreign('user_id', 'social_accounts_user_id_foreign')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_accounts');
    }
};
