'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Send, Youtube } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

const FLIER_ASSET = '/assets/RFC-SRN-Event-NEW.jpg';
const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/share/1K8UsKUAD3/?mibextid=wwXIfr', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.youtube.com/@SoundofRevivalNetwork', icon: Youtube, label: 'YouTube' },
  { href: 'https://t.me/SRevivalN', icon: Send, label: 'Telegram' }
];

export default function Getdp() {
  const [name, setName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [editedFlierUrl, setEditedFlierUrl] = useState(null);
  const [isFlierReady, setIsFlierReady] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [uploadResetCounter, setUploadResetCounter] = useState(0);
  const [imageTransform, setImageTransform] = useState({
    scale: 100,
    offsetX: 0,
    offsetY: 0
  });

  const canvasRef = useRef(null);
  const flierImageRef = useRef(null);

  const sanitizedName = useMemo(() => name.trim(), [name]);

  const drawName = useCallback(
    (ctx) => {
      if (!sanitizedName) return;
      ctx.save();
      ctx.font = '30px "Montserrat", sans-serif';
      ctx.fillStyle = '#000000ff';
      ctx.textAlign = 'center';
      const x = ctx.canvas.width * 0.5;
      const y = ctx.canvas.height * 0.78;
      const paddingX = 6;
      const paddingY = 1;
      const textMetrics = ctx.measureText(sanitizedName);
      const textWidth = textMetrics.width;
      const boxWidth = textWidth + paddingX * 2;
      const boxHeight = 30;
      const boxX = x - boxWidth / 2;
      const boxY = y - boxHeight + paddingY;

      ctx.save();
      ctx.beginPath();
      const radius = 10;
      ctx.moveTo(boxX + radius, boxY);
      ctx.lineTo(boxX + boxWidth - radius, boxY);
      ctx.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + radius);
      ctx.lineTo(boxX + boxWidth, boxY + boxHeight - radius);
      ctx.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - radius, boxY + boxHeight);
      ctx.lineTo(boxX + radius, boxY + boxHeight);
      ctx.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - radius);
      ctx.lineTo(boxX, boxY + radius);
      ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(245, 194, 66, 0.85)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();

      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillText(sanitizedName, x, y - 4);
      ctx.restore();
    },
    [sanitizedName]
  );

  const generateCompositedImage = useCallback(() => {
    if (!canvasRef.current || !flierImageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const baseFlier = flierImageRef.current;

    canvas.width = baseFlier.width;
    canvas.height = baseFlier.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseFlier, 0, 0);
    const userImgX = canvas.width * 0.5;
    const userImgY = canvas.height * 0.59;
    const radius = Math.min(canvas.width, canvas.height) * 0.20;

    const drawCircleClip = () => {
      ctx.beginPath();
      ctx.arc(userImgX, userImgY, radius, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawOutline = (outlineRadius, color, width, shadowBlur = 0) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(userImgX, userImgY, outlineRadius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      if (shadowBlur) {
        ctx.shadowColor = color;
        ctx.shadowBlur = shadowBlur;
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawConfirmedBadge = () => {
      const text = 'ATTENDING';
      const paddingX = 10;
      const font = 'bold 26px "Montserrat", sans-serif';
      ctx.save();
      ctx.font = font;
      const textMetrics = ctx.measureText(text);
      const badgeWidth = textMetrics.width + paddingX * 2;
      const badgeHeight = 40;
      const x = Math.min(canvas.width - badgeWidth - 20, userImgX + radius * 0.4);
      const y = userImgY + radius * 0.55;

      const drawRoundedRect = (px, py, w, h, r) => {
        const radiusVal = Math.min(r, h / 2, w / 2);
        ctx.beginPath();
        ctx.moveTo(px + radiusVal, py);
        ctx.lineTo(px + w - radiusVal, py);
        ctx.quadraticCurveTo(px + w, py, px + w, py + radiusVal);
        ctx.lineTo(px + w, py + h - radiusVal);
        ctx.quadraticCurveTo(px + w, py + h, px + w - radiusVal, py + h);
        ctx.lineTo(px + radiusVal, py + h);
        ctx.quadraticCurveTo(px, py + h, px, py + h - radiusVal);
        ctx.lineTo(px, py + radiusVal);
        ctx.quadraticCurveTo(px, py, px + radiusVal, py);
        ctx.closePath();
      };

      drawRoundedRect(x, y, badgeWidth, badgeHeight, 12);
      const redGradient = ctx.createLinearGradient(x, y, x + badgeWidth, y + badgeHeight);
      redGradient.addColorStop(0, '#b31217');
      redGradient.addColorStop(1, '#e52d27');
      ctx.fillStyle = redGradient;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f5c242';
      ctx.shadowColor = 'rgba(229, 45, 39, 0.6)';
      ctx.shadowBlur = 14;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x + paddingX, y + badgeHeight / 2);
      ctx.restore();
    };

    if (userImage?.preview && typeof window !== 'undefined') {
      const currentPreview = userImage.preview;
      const img = new window.Image();
      img.src = currentPreview;
      img.onload = () => {
        ctx.save();
        drawCircleClip();
        ctx.clip();
        // image positioning
        const targetSize = radius * 2 * (imageTransform.scale / 100);
        const scale = Math.max(targetSize / img.width, targetSize / img.height);
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const drawX = userImgX - drawWidth / 2 + imageTransform.offsetX;
        const drawY = userImgY - drawHeight / 2 + imageTransform.offsetY;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        ctx.restore();
        drawOutline(radius + 10, '#f5c242', 12, 8);
        drawOutline(Math.max(radius - 6, 10), '#ffea94', 6);
        drawName(ctx);
        drawConfirmedBadge();
        setEditedFlierUrl(canvas.toDataURL('image/png'));
      };
      img.onerror = () => {
        drawOutline(radius + 10, '#f5c242', 12, 8);
        drawOutline(Math.max(radius - 6, 10), '#ffea94', 6);
        drawName(ctx);
        drawConfirmedBadge();
        setEditedFlierUrl(canvas.toDataURL('image/png'));
      };
      return;
    }
    setEditedFlierUrl(null);
  }, [drawName, imageTransform.offsetX, imageTransform.offsetY, imageTransform.scale, userImage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const img = new window.Image();
    img.src = FLIER_ASSET;
    img.onload = () => {
      flierImageRef.current = img;
      setCanvasSize({ width: img.width, height: img.height });
      setIsFlierReady(true);
    };
  }, []);

  useEffect(() => {
    if (!isFlierReady || !userImage) return;
    generateCompositedImage();
  }, [generateCompositedImage, isFlierReady, sanitizedName, userImage]);

  const handleDownload = () => {
    if (!editedFlierUrl) {
      alert('Please enter your name and upload an image first.');
      return;
    }

    const link = document.createElement('a');
    link.href = editedFlierUrl;
  link.download = `Rivers-of-Living-Water-Revival-Fire-Conference- <br/>${(sanitizedName || 'guest').replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setName('');
    setUserImage(null);
    setEditedFlierUrl(null);
    setUploadResetCounter((count) => count + 1);
  };

  return (
    <div className="w-full max-w-6xl space-y-16" data-testid="getdp-root">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-glow">
        <Image
          src="/RFC-SRN-Event-NEW.jpg"
          alt="Revival Fire Conference Rivers of Living Water backdrop"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 960px"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-12 h-48 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 via-cyan-200/35 to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-red-700 opacity-70 blur-3xl"
        />
        <div className="relative space-y-10 bg-secondary/70 p-6 backdrop-blur-sm">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Rivers of Living Water</p>
          <h1 className="mt-4 text-3xl font-bold text-highlight md:text-4xl">
            Revival Fire Conference · Hosted by Sound of Revival Network
          </h1>
          <p className="mt-2 text-base text-highlight/80">
            Create your personalized display picture for the Revival Fire Conference and share the encounter invite.
          </p>
        </header>

        <div className="grid gap-4 rounded-2xl border border-white/10 bg-secondary/60 p-4 sm:grid-cols-2">
          <div className="space-y-1 rounded-xl bg-accent/90 p-4 text-black shadow-[0_10px_35px_rgba(0,0,0,0.25)] sm:col-span-2">
             <div className="overflow-hidden rounded-xl border border-black/10 bg-white/80">
                <Image
                  src="/srn.jpeg"
                  alt="Revival Fire Conference official flier"
                  width={1200}
                  height={620}
                  className="h-auto w-full object-cover"
                  priority
                />
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-secondary/60 p-6">
            <form
              className="flex flex-col gap-8"
              onSubmit={(event) => {
                event.preventDefault();
                if (!userImage) return;
                generateCompositedImage();
              }}
            >
              <label className="flex flex-col gap-3 text-sm font-semibold text-accent">
                <span>Your Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Kindly input your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-base text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                />
              </label>

              <div className="flex flex-col gap-3 text-sm font-semibold text-accent">
                <span>Upload Image</span>
                <ImageUpload key={uploadResetCounter} onImageUploaded={setUserImage} />
              </div>


              <button
                type="submit"
                className="rounded-xl bg-accent py-3 font-semibold text-white transition hover:bg-accentAlt focus:outline-none focus:ring-4 focus:ring-accent/40"
              >
                Refresh Preview
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center justify-start rounded-2xl bg-secondary/80 p-6">
            <img
              src={editedFlierUrl || FLIER_ASSET}
              alt="Rivers of Living Water conference DP preview"
              className="w-full max-w-3xl rounded-2xl object-contain shadow-glow"
            />
            {canvasSize.width > 0 && (
              <p className="mt-3 text-xs text-neutral-400">
                Your Image is {canvasSize.width} by {canvasSize.height}.<br /> Use the Scale slider to adjust the size and position of your photo.
              </p>
            )}
          </div>
        </div>

              <div className="grid gap-4 rounded-2xl border border-white/10 bg-secondary/40 p-4 text-sm font-semibold text-accent">
                <span>Position & Scale</span>
                <label className="flex flex-col gap-2">
                  <span>Scale ({imageTransform.scale}%)</span>
                  <input
                    type="range"
                    min="60"
                    max="160"
                    value={imageTransform.scale}
                    onChange={(event) =>
                      setImageTransform((prev) => ({ ...prev, scale: Number(event.target.value) }))
                    }
                    className="accent-accent"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Horizontal Offset ({imageTransform.offsetX}px)</span>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    value={imageTransform.offsetX}
                    onChange={(event) =>
                      setImageTransform((prev) => ({ ...prev, offsetX: Number(event.target.value) }))
                    }
                    className="accent-accent"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Vertical Offset ({imageTransform.offsetY}px)</span>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    value={imageTransform.offsetY}
                    onChange={(event) =>
                      setImageTransform((prev) => ({ ...prev, offsetY: Number(event.target.value) }))
                    }
                    className="accent-accent"
                  />
                </label>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-highlight transition hover:border-accent hover:text-white"
                  onClick={() =>
                    setImageTransform({
                      scale: 100,
                      offsetX: 0,
                      offsetY: 0
                    })
                  }
                >
                  Reset Adjustments
                </button>
              </div>
        <div className="text-center">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!editedFlierUrl}
            className="w-full rounded-2xl bg-accent py-4 text-lg font-semibold text-white transition hover:bg-accentAlt disabled:cursor-not-allowed disabled:bg-accent/40"
          >
            Download Your Conference DP
          </button>
          {!editedFlierUrl && (
            <p className="mt-3 text-sm text-neutral-400">
              Enter your name and upload a photo to enable the download button.
            </p>
          )}
        </div>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-6 border-t border-white/10 pt-10 text-center text-sm text-neutral-400 md:flex-row md:justify-between">
        <div className="flex gap-5">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon strokeWidth={0.75} className="text-white transition hover:text-accent" />
            </Link>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} Sound of Revival Network · Rivers of Living Water.</p>
      </footer>
    </div>
  );
}
