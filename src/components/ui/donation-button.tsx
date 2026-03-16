import { Button } from "@/components/ui/button";

const DonationButton: React.FC = () => {
  return (
    <Button
        type="button"
        className="bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/40 hover:shadow-primary/50 hover:from-primary/90 hover:to-secondary/90"
        onClick={() => {
          window.location.href = "https://shakthisat-global.vercel.app";
        }}
      >
        Donate Now
      </Button>
  );
};

export default DonationButton;
