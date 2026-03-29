<?php

abstract class PDU
{
    protected string $payload;

    public function __construct(string $payload)
    {
        $this->payload = $payload;
    }

    public function getPayload(): string
    {
        return $this->payload;
    }

    public function setPayload(string $payload): void
    {
        $this->payload = $payload;
    }

    abstract public function isValid(): bool;
}

class EthFrame extends PDU
{
    private string $dmac;
    private string $smac;
    private int $type;
    private ?int $fcs;

    public function __construct(string $dmac, string $smac, int $type, string $payload, ?int $fcs = null)
    {
        parent::__construct($payload);

        if (!self::isValidMac($dmac)) {
            throw new InvalidArgumentException("Neplatná cílová MAC adresa: $dmac");
        }
        if (!self::isValidMac($smac)) {
            throw new InvalidArgumentException("Neplatná zdrojová MAC adresa: $smac");
        }

        $this->dmac = $dmac;
        $this->smac = $smac;
        $this->type = $type;

        if ($fcs !== null) {
            $this->fcs = $fcs;
        } else {
            $this->fcs = $this->calculateFcs();
        }
    }

    public static function isValidMac(string $mac): bool
    {
        return preg_match('/^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/', $mac) === 1;
    }

    public function calculateFcs(): int
    {
        $dataStr = $this->dmac . $this->smac . $this->type . $this->getPayload();
        $hash = 0;
        for ($i = 0; $i < strlen($dataStr); $i++) {
            $hash += ord($dataStr[$i]);
        }
        return $hash;
    }

    private function recalculateFcs(): void
    {
        $this->fcs = $this->calculateFcs();
    }

    // Gettery a settery
    public function getDmac(): string
    {
        return $this->dmac;
    }

    public function setDmac(string $dmac): void
    {
        if (!self::isValidMac($dmac)) {
            throw new InvalidArgumentException("Neplatná formát MAC adresy: $dmac");
        }
        $this->dmac = $dmac;
        $this->recalculateFcs();
    }

    public function getSmac(): string
    {
        return $this->smac;
    }

    public function setSmac(string $smac): void
    {
        if (!self::isValidMac($smac)) {
            throw new InvalidArgumentException("Neplatná formát MAC adresy: $smac");
        }
        $this->smac = $smac;
        $this->recalculateFcs();
    }

    public function getType(): int
    {
        return $this->type;
    }

    public function setType(int $type): void
    {
        $this->type = $type;
        $this->recalculateFcs();
    }

    public function getFcs(): ?int
    {
        return $this->fcs;
    }

    // Přepisujeme payload setter, abychom přepočítali FCS při jeho změně zvenčí
    public function setPayload(string $payload): void
    {
        parent::setPayload($payload);
        $this->recalculateFcs();
    }

    public function isValid(): bool
    {
        return $this->calculateFcs() === $this->fcs;
    }

    public function __toString(): string
    {
        return sprintf(
            "[Rámec] ZDROJ: %s -> CÍL: %s | TYP: 0x%04X | FCS: %s | DATA: '%s'",
            $this->smac,
            $this->dmac,
            $this->type,
            $this->fcs,
            $this->getPayload()
        );
    }

    public function corruptData(): void
    {
        parent::setPayload("Rozbite_data_behem_prenosu");
        // Schválně změníme FCS tak, aby výpočet validace selhal
        $this->fcs = 999999;
    }
}

// === Ukázka použití ===
// Aby se PHP chovalo slušně v CLI, přidáme try/catch a konec
try {
    echo "--- Vytváření platného rámce ---\n";
    $frame1 = new EthFrame("fa:31:45:65:c6:a9", "00:1a:2b:3c:4d:5e", 0x0800, "Hello World!");
    echo $frame1 . "\n";
    echo "Původní FCS: " . $frame1->getFcs() . "\n";
    echo "Je rámec validní? " . ($frame1->isValid() ? "True" : "False") . "\n";

    echo "\n--- Změna payloadu přes setter ---\n";
    $frame1->setPayload("New secure data");
    echo $frame1 . "\n";
    echo "Nové FCS po změně payloadu: " . $frame1->getFcs() . "\n";
    echo "Je rámec validní po legitimní změně? " . ($frame1->isValid() ? "True" : "False") . "\n";

    echo "\n--- Simulace poškození přenosu ---\n";
    $frame1->corruptData();
    echo $frame1 . "\n";
    echo "Je poškozený rámec validní? " . ($frame1->isValid() ? "True" : "False") . "\n";

    echo "\n--- Pokus o vytvoření rámce s chybou ---\n";
    $badFrame = new EthFrame("invalid-mac-address", "00:1a:2b:3c:4d:5e", 0x0800, "Test data");

} catch (Exception $e) {
    echo "\nZachycena chyba: " . $e->getMessage() . "\n";
}
