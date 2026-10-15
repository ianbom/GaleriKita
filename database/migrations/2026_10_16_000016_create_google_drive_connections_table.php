<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('google_drive_connections', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('google_subject', 191);
            $table->string('google_email', 150);
            $table->text('refresh_token_encrypted')->nullable();
            $table->text('granted_scopes')->nullable();
            $table->enum('status', ['active', 'needs_reauth', 'revoked'])->default('active');
            $table->timestampTz('connected_at')->nullable();
            $table->timestampTz('last_checked_at')->nullable();
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->unique(['user_id', 'google_subject'], 'google_drive_connections_user_id_google_subject_unique');
            $table->index(['user_id', 'status'], 'google_drive_connections_user_id_status_index');
            $table->foreign('user_id', 'google_drive_connections_user_id_foreign')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('google_drive_connections');
    }
};
