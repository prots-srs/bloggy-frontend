
import messages from '@lib/messages';

export default async function Footer() {
  return (
    <div className="container py-4 bg-secondary text-center">
      <p className="m-0 text-white">{messages.footer.copyright}&nbsp;</p>
    </div>
  );
}
