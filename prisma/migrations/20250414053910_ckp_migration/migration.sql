/*
  Warnings:

  - You are about to drop the column `golongan` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `tmt` on the `pegawai` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nip_bps]` on the table `pegawai` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gol_akhir` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip_bps` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmt_gol` to the `pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pegawai` DROP COLUMN `golongan`,
    DROP COLUMN `tmt`,
    ADD COLUMN `gol_akhir` VARCHAR(64) NOT NULL,
    ADD COLUMN `nip_bps` CHAR(64) NOT NULL,
    ADD COLUMN `tmt_gol` VARCHAR(64) NOT NULL;

-- CreateTable
CREATE TABLE `skp_ckp` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(64) NOT NULL,
    `bulan` VARCHAR(20) NOT NULL,
    `tahun` VARCHAR(4) NOT NULL,
    `tgl_mulai` DATETIME(6) NOT NULL,
    `tgl_selesai` DATETIME(6) NOT NULL,
    `jam_mulai` TIME(6) NOT NULL,
    `jam_selesai` TIME(6) NOT NULL,
    `rencana_kinerja` LONGTEXT NOT NULL,
    `kegiatan` LONGTEXT NOT NULL,
    `progress` INTEGER NOT NULL,
    `capaian` LONGTEXT NOT NULL,
    `data_dukung` LONGTEXT NOT NULL,
    `capaian_skp` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `pegawai_nip_bps_key` ON `pegawai`(`nip_bps`);

-- AddForeignKey
ALTER TABLE `skp_ckp` ADD CONSTRAINT `skp_ckp_nip_fkey` FOREIGN KEY (`nip`) REFERENCES `pegawai`(`nip_bps`) ON DELETE RESTRICT ON UPDATE CASCADE;
